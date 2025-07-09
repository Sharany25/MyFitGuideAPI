import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuejaSugerencia, QuejaSugerenciaDocument } from './schema/queja-sugerencia.schema';
import { CreateQuejaSugerenciaDto } from './dto/create-queja-sugerencia.dto';
import { UpdateQuejaSugerenciaDto } from './dto/update-queja-sugerencia.dto';
import * as nodemailer from 'nodemailer';
import * as path from 'path';
import { Cron, CronExpression } from '@nestjs/schedule';

type Estado = 'nuevo' | 'en revisión' | 'respondido' | 'cerrado';

@Injectable()
export class QuejaSugerenciaService {
  private readonly logger = new Logger(QuejaSugerenciaService.name);

  constructor(
    @InjectModel(QuejaSugerencia.name)
    private readonly quejaSugerenciaModel: Model<QuejaSugerenciaDocument>,
  ) {}

  async create(createQuejaSugerenciaDto: CreateQuejaSugerenciaDto) {
    const created = new this.quejaSugerenciaModel({
      ...createQuejaSugerenciaDto,
      estado: 'nuevo',
      fechaRespuesta: undefined,
      respuesta: undefined,
    });
    return created.save();
  }

  async findAll() {
    return this.quejaSugerenciaModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string) {
    return this.quejaSugerenciaModel.findById(id).exec();
  }

  async update(id: string, updateDto: UpdateQuejaSugerenciaDto) {
    const queja = await this.quejaSugerenciaModel.findById(id).exec();
    if (!queja) throw new BadRequestException('No existe el registro');

    const estadoActual: Estado = queja.estado ?? 'nuevo';
    const estadoNuevo: Estado = updateDto.estado ?? 'nuevo';


    if (!this.puedeAvanzarEstado(estadoActual, estadoNuevo)) {
      throw new BadRequestException(
        `No se puede cambiar de "${estadoActual}" a "${estadoNuevo}".`
      );
    }

    if (estadoNuevo === 'respondido') {
      if (!updateDto.respuesta?.trim()) {
        throw new BadRequestException('La respuesta es obligatoria para marcar como respondido.');
      }
      queja.respuesta = updateDto.respuesta;
      queja.fechaRespuesta = new Date();
      if (queja.emailContacto) {
        await this.enviarCorreoRespuesta(
          queja.emailContacto,
          queja.tipo,
          queja.mensaje,
          updateDto.respuesta
        );
      }
    }

    queja.estado = estadoNuevo;

    await queja.save();
    return queja;
  }

  private puedeAvanzarEstado(actual: Estado, nuevo: Estado): boolean {
    const flujo: Record<Estado, Estado[]> = {
      'nuevo': ['en revisión'],
      'en revisión': ['respondido'],
      'respondido': [],
      'cerrado': [],
    };
    return flujo[actual].includes(nuevo);
  }

  async remove(id: string) {
    return this.quejaSugerenciaModel.findByIdAndDelete(id).exec();
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async cerrarRespondidosAutomaticamente() {
    const haceUnDia = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const result = await this.quejaSugerenciaModel.updateMany(
      { estado: 'respondido', fechaRespuesta: { $lte: haceUnDia } },
      { $set: { estado: 'cerrado' } }
    );
    if (result.modifiedCount) {
      this.logger.log(`Cerradas automáticamente ${result.modifiedCount} quejas/sugerencias respondidas.`);
    }
  }

  private async enviarCorreoRespuesta(to: string, tipo: string, mensaje: string, respuesta: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const imgPath = path.join(process.cwd(), 'assets', 'Email.jpg');
    const htmlContent = `
      <div style="max-width:450px;margin:0 auto;background:#23272b;border-radius:20px;overflow:hidden;box-shadow:0 6px 24px #0002;">
        <div style="background:linear-gradient(135deg,#23c6d8,#4ad991);padding:36px 0 18px 0;text-align:center;">
          <img src="cid:logoimg" alt="Logo" width="90" style="border-radius:16px;border:3px solid #fff;margin-bottom:14px;" />
          <h2 style="color:#fff;font-size:2rem;font-weight:600;margin:0;">Soporte MyFitGuide</h2>
        </div>
        <div style="background:#23272b;padding:32px 24px 24px 24px;color:#fff;">
          <h3 style="color:#4ad991;margin-top:0;">¡Hemos respondido tu solicitud!</h3>
          <p style="color:#fff;font-size:1rem;margin-bottom:22px;">
            <b>Tu mensaje:</b><br>
            <span style="color:#c6f4ff;">"${mensaje}"</span>
          </p>
          <div style="background:#222c22;padding:18px;border-radius:8px;margin-bottom:18px;border-left:6px solid #4ad991;">
            <p style="color:#fff;margin:0 0 6px 0;"><b>Respuesta de Soporte:</b></p>
            <p style="color:#4ad991;margin:0;font-size:1.08rem;">${respuesta}</p>
          </div>
          <p style="color:#bdbdbd;font-size:0.95rem;margin-top:32px;">Gracias por contactarnos.<br>
            Si necesitas más ayuda, responde este correo.<br>
            — Equipo MyFitGuide</p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"Soporte MyFitGuide" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Soporte MyFitGuide',
      html: htmlContent,
      attachments: [{
        filename: 'Email.jpg',
        path: imgPath,
        cid: 'logoimg'
      }]
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (err) {
      this.logger.error("Error enviando correo de respuesta", err);
    }
  }
}
