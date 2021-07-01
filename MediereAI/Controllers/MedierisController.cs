using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
//using javax.xml.transform;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using MediereAI.AuxClasses;
using MediereAI.Models;
using System.Diagnostics;

namespace Reclamatii.Controllers
{
    [Route("api/history")]
    [ApiController]
    public class MedierisController : ControllerBase
    {
        public MediereAIContext DB = new MediereAIContext();

        [Route("Read")]
        [HttpPost]
        public List<Medieri> ReclamatiiRead(Login login)
        {
            var result = DB.Setari.FirstOrDefault();
            if (login.Email == result.Email)
            {
                List<Medieri> log = DB.Medieri.ToList<Medieri>();
                return log;
            }
            else
            {
                List<Medieri> log = DB.Medieri.Where(x => x.Email.Equals(login.Email)).ToList<Medieri>();
                return log;
            }
        }

        [Route("Vizite")]
        [HttpPost]
        public List<ObiectMeniu> Vizite()
        {
            var lista = new List<ObiectMeniu>();
            var result = DB.Medieri.ToList<Medieri>();
            var email = DB.Utilizatori.ToList<Utilizatori>();
            email.ForEach(e =>
            {
                ObiectMeniu aux = new ObiectMeniu();
                aux.state = null;
                aux.nume = null;
                aux.prenume = null;
                aux.id = result.Where(x => x.Email.Equals(e.Email)).Count();
                aux.name = e.Email;
                aux.state = e.Counter.ToString();
                lista.Add(aux);
            });

            return lista;
        }

        [Route("Write")]
        [HttpPost]
        public string InsertReclamatie(Medieri Reg)
        {
            Reg.StatusMediere = "Cerere De Conciliere";
            DB.Medieri.Add(Reg);
            DB.SaveChanges();
            return "Record saved!";
        }

        [Route("BOT")]
        [HttpPost]
        public void BOT(PreluareId id)
        {
            var psi = new ProcessStartInfo();
            psi.FileName = @"C:\Python39\python.exe"; //locatie Python

            ///script si argumente
            var script = System.IO.Directory.GetCurrentDirectory()+ @"\Python\Licenta_Bot.py"; //script AI pentru mediere
            var argument1 = "1";//id.Id;

            psi.Arguments = $"\"{script}\" \"{argument1}\"";

            ///configurare proces
            psi.UseShellExecute = false;
            psi.CreateNoWindow = true;
            psi.RedirectStandardOutput = true;
            psi.RedirectStandardError = true;

            ///obtinere output
            var erori = "";
            var rezultat = "";

            using (var process = Process.Start(psi))
            {
                erori = process.StandardError.ReadToEnd();
                rezultat = process.StandardOutput.ReadToEnd();
            }

            //update baza de date
            var log = DB.Medieri.Where(x => x.Id.ToString() == id.Id).FirstOrDefault();
            log.Raspuns = rezultat;
            log.StatusMediere = "AI Responded";
            DB.SaveChanges();

            //trimitere email
            var result = DB.Setari.FirstOrDefault();
            MailMessage mesaj = new MailMessage();
            mesaj.From = new MailAddress(result.Email);
            mesaj.To.Add(log.Email);
            if (log.EmailReclamat != null)
            {
                mesaj.To.Add(log.EmailReclamat);
            }
            mesaj.Subject = "Answer to the complaint registered by " + log.Reclamant;
            mesaj.Body = rezultat;
            mesaj.IsBodyHtml = false;
            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com");
            smtpClient.Port = 587;
            smtpClient.Credentials = new System.Net.NetworkCredential(result.Email, result.Parola);
            smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
            smtpClient.EnableSsl = true;
            smtpClient.Send(mesaj);
        }

        /*
        [Route("Exemplu")]
        [HttpPost]
        public void EmailFormular(Medieri a)
        {
            var result = DB.Setari.FirstOrDefault();

            string s = "Nume: " + a.Nume + Environment.NewLine
                + "\nPrenume: " + a.Prenume + Environment.NewLine
                + "\nEmail: " + a.Email + Environment.NewLine
                + "\nTelefon: " + (a.Telefon != null ? a.Telefon : "neprecizat") + Environment.NewLine
                + "\nClient/Comerciant: " + (a.ClientComerciant != null ? a.ClientComerciant : "neprecizat") + Environment.NewLine
                + "\nTara: " + (a.Tara != null ? a.Tara : "neprecizat") + Environment.NewLine
                + "\nJudet: " + (a.Judet != null ? a.Judet : "neprecizat") + Environment.NewLine
                + "\nOras: " + (a.Oras != null ? a.Oras : "neprecizat") + Environment.NewLine
                + "\nCod Postal: " + (a.CodPostal != null ? a.CodPostal : "neprecizat") + Environment.NewLine
                + "\nNume cealalta parte: " + (a.NumeReclamat != null ? a.NumeReclamat : "neprecizat") + Environment.NewLine
                + "\nPrenume cealalta parte: " + (a.PrenumeReclamat != null ? a.PrenumeReclamat : "neprecizat") + Environment.NewLine
                + "\nEmail cealalta parte: " + (a.EmailReclamat != null ? a.EmailReclamat : "neprecizat") + Environment.NewLine
                + "\nTelefon cealalta parte: " + (a.TelefonReclamat != null ? a.TelefonReclamat : "neprecizat") + Environment.NewLine
                + "\nClient/Comerciant" + (a.ClientComerciantReclamat != null ? a.ClientComerciantReclamat : "neprecizat") + Environment.NewLine
                + "\nTara cealalta parte: " + (a.TaraReclamat != null ? a.TaraReclamat : "neprecizat") + Environment.NewLine
                + "\nJudet cealalta parte: " + (a.JudetReclamat != null ? a.JudetReclamat : "neprecizat") + Environment.NewLine
                + "\nOras cealalta parte: " + (a.OrasReclamat != null ? a.OrasReclamat : "neprecizat") + Environment.NewLine
                + "\nData eveniment mediere: " + a.Zi + "-" + a.Luna + "-" + a.An + Environment.NewLine
                + "\nValoarea monetara: " + a.Bani + Environment.NewLine
                + "\nSubiect mediere: " + a.Subiect + Environment.NewLine
                + "\nDescriere: " + a.Text;

            MailMessage mesaj = new MailMessage(result.Email, a.Email, "Cerere de mediere legata de " + a.NumeReclamat + " " + a.PrenumeReclamat, s);//email client
            mesaj.IsBodyHtml = false;
            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com");
            smtpClient.Port = 587;
            smtpClient.Credentials = new System.Net.NetworkCredential(result.Email, result.Parola);
            smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
            smtpClient.EnableSsl = true;
            smtpClient.Send(mesaj);
        }*/

        //repara email
        
        [Route("Email")]
        [HttpPost]
        public void EmailMediere(Email mail)
        {
            if (mail.Mail != null)
            {
                var help = DB.Setari.SingleOrDefault();
                MailMessage mesaj = new MailMessage(help.Email, mail.Mail, "Your Request", "Reclamant:" + mail.Reclamant + Environment.NewLine + "Reclamat:" + mail.Reclamat + Environment.NewLine + mail.Text_mediat + Environment.NewLine + "Status: " + mail.Status);//email client
                mesaj.IsBodyHtml = true;
                SmtpClient smtpClient = new SmtpClient("smtp.gmail.com");
                smtpClient.Port = 587;
                smtpClient.Credentials = new System.Net.NetworkCredential(help.Email, help.Parola);//se inlocuieste cu al clientului
                smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtpClient.EnableSsl = true;
                smtpClient.Send(mesaj);

                var result = DB.Medieri.Where(a => a.Email.Equals(mail.Mail)
                                                            && a.Reclamat.Equals(mail.Reclamat)
                                                            && a.Reclamant.Equals(mail.Reclamant)
                                                            && a.Descriere.Equals(mail.Text_mediat))
                                                    .SingleOrDefault();

                if (result != null)
                {
                    try
                    {
                        result.StatusMediere = mail.Status;
                        DB.SaveChanges();
                    }
                    catch (Exception e)
                    {

                    }
                }
            }
        }
    }
}

