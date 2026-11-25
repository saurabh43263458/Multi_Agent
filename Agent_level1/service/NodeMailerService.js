import nodemailer from "nodemailer"

// create one transporter


const transporter = nodemailer.createTransport({
    host:process.env.SMTP_Host,
    port:Number(process.env.SMTP_PORT),
    secure:true,
    auth:{
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PASS
    }
});


/**
 * @param:{{to:string,subject:string,text?: string,html?: string}}
 */

export async function sendmailer({to,subject,text,html}){
    const info = await transporter.sendMail({
        from:process.env.MAIL_FROM,
        to,
        subject,
        text,
        html
    })
    return info;
}

export async function verifyMailer() {
  await transporter.verify();
  console.log("SMTP server is ready");
}