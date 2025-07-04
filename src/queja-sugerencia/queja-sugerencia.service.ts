import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuejaSugerencia, QuejaSugerenciaDocument } from './schema/queja-sugerencia.schema';
import { CreateQuejaSugerenciaDto } from './dto/create-queja-sugerencia.dto';
import { UpdateQuejaSugerenciaDto } from './dto/update-queja-sugerencia.dto';
import * as nodemailer from 'nodemailer';
import * as path from 'path';

@Injectable()
export class QuejaSugerenciaService {
  constructor(
    @InjectModel(QuejaSugerencia.name)
    private readonly quejaSugerenciaModel: Model<QuejaSugerenciaDocument>,
  ) {}

  async create(createQuejaSugerenciaDto: CreateQuejaSugerenciaDto) {
    const created = new this.quejaSugerenciaModel(createQuejaSugerenciaDto);
    return created.save();
  }

  async findAll() {
    return this.quejaSugerenciaModel.find().exec();
  }

  async findOne(id: string) {
    return this.quejaSugerenciaModel.findById(id).exec();
  }

  async update(id: string, updateQuejaSugerenciaDto: UpdateQuejaSugerenciaDto) {
    const updated = await this.quejaSugerenciaModel.findByIdAndUpdate(id, updateQuejaSugerenciaDto, { new: true }).exec();

    // Enviar correo si la queja fue respondida y hay correo de contacto y respuesta
    if (
      updated &&
      updated.estado === 'respondido' &&
      updated.emailContacto &&
      updateQuejaSugerenciaDto.respuesta
    ) {
      await this.enviarCorreoRespuesta(
        updated.emailContacto,
        updated.tipo,
        updated.mensaje,
        updateQuejaSugerenciaDto.respuesta
      );
    }

    return updated;
  }

  async remove(id: string) {
    return this.quejaSugerenciaModel.findByIdAndDelete(id).exec();
  }

  // Lógica para enviar el correo directamente aquí mismo
  private async enviarCorreoRespuesta(to: string, tipo: string, mensaje: string, respuesta: string) {
    // Configura el transporter de nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Ruta absoluta a /assets/Email.jpg
    const imgPath = path.join(process.cwd(), 'assets', 'Email.jpg');

    // HTML para el correo con imagen incrustada y diseño profesional
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

    // Opciones del correo
    const mailOptions = {
      from: `"Soporte MyFitGuide" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Soporte MyFitGuide',
      html: htmlContent,
      attachments: [{
        filename: 'Email.jpg',
        path: imgPath,
        cid: 'logoimg' // mismo cid que en el src del img
      }]
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);
  }
}
