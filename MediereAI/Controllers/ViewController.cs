using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using MediereAI.AuxClasses;
using MediereAI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MediereAI.Controllers
{
    [Route("api/view")]
    [ApiController]
    public class ViewController : Controller
    {
        public MediereAIContext DB = new MediereAIContext();

        [Route("getAdresa")]
        [HttpPost]
        public string GetAdresa()
        {
            var result = DB.Setari.SingleOrDefault();
            return result.Adresa;
        }

        [Route("setAdresa")]
        [HttpPost]
        public void SalvareAdresa(Login a)
        {
            var result = DB.Setari.SingleOrDefault();
            if (result != null)
            {
                try
                {
                    result.Adresa = a.Email;
                    DB.SaveChanges();
                }
                catch (Exception e)
                {

                }
            }
        }

        [Route("Vizite")]
        [HttpPost]
        public void Vizite()
        {
            var set = DB.Setari.SingleOrDefault();
            set.Vizitari += 1;
            DB.SaveChanges();
        }

        [Route("getVizite")]
        [HttpPost]
        public string GetVizite()
        {
            var set = DB.Setari.SingleOrDefault();
            return set.Vizitari.ToString();
        }

        [Route("Counter")]
        [HttpPost]
        public void UpdateCounter(Login x)
        {
            DateTime localDate = DateTime.Now.Date;
            var data = localDate.ToString("dd/MM/yyyy");
            var log = DB.Vizualizari.Where(x => x.Data == data).SingleOrDefault();
            if (log != null)
            {
                log.NumarVizualizari = log.NumarVizualizari + 1;
                DB.SaveChanges();
            }
            else
            {
                var a = new Vizualizari();
                a.Data = data;
                a.NumarVizualizari = 1;
                DB.Vizualizari.Add(a);
                DB.SaveChanges();
            }
        }

        [Route("Chart")]
        [HttpPost]
        public JsonResult Chart()
        {
            var result = DB.Vizualizari.OrderByDescending(x => x.Id).Take(7).ToList<Vizualizari>().Reverse<Vizualizari>();
            return new JsonResult(result);
        }

        [Route("MesajContact")]
        [HttpPost]
        public Returned MailContact(ObiectMeniu a)
        {
            var help = DB.Setari.SingleOrDefault();
            MailMessage mesaj = new MailMessage(help.Email, help.Email, "Message from" + a.nume, "Email: " + a.name + Environment.NewLine + a.state);//email client
            mesaj.IsBodyHtml = false;
            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com");
            smtpClient.Port = 587;
            smtpClient.Credentials = new System.Net.NetworkCredential(help.Email, help.Parola);//se inlocuieste cu al clientului
            smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
            smtpClient.EnableSsl = true;
            smtpClient.Send(mesaj);
            return new Returned();
        }

        [Route("PozaHome")]
        [HttpPost]
        public void PozaHome([FromForm] Fisiere fis)
        {
            var uploads = Path.Combine(Directory.GetCurrentDirectory(), "ClientApp\\public\\images");
            if (fis.body != null && fis.body.Length > 0)
            {
                var filePath = Path.Combine(uploads, "Home.jpg");

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    fis.body.CopyTo(fileStream);
                }

            }
        }
        
        [Route("PozaContact")]
        [HttpPost]
        public void PozaContact([FromForm] Fisiere fis)
        {
            var uploads = Path.Combine(Directory.GetCurrentDirectory(), "ClientApp\\public\\images");
            if (fis.body != null && fis.body.Length > 0)
            {
                var filePath = Path.Combine(uploads, "Contact.jpg");

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    fis.body.CopyTo(fileStream);
                }

            }
        }
        
        [Route("PozaIstoric")]
        [HttpPost]
        public void PozaIstoric([FromForm] Fisiere fis)
        {
            var uploads = Path.Combine(Directory.GetCurrentDirectory(), "ClientApp\\public\\images");
            if (fis.body != null && fis.body.Length > 0)
            {
                var filePath = Path.Combine(uploads, "History.jpg");

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    fis.body.CopyTo(fileStream);
                }

            }
        }
        
        [Route("PozaFormular")]
        [HttpPost]
        public void PozaFormular([FromForm] Fisiere fis)
        {
            var uploads = Path.Combine(Directory.GetCurrentDirectory(), "ClientApp\\public\\images");
            if (fis.body != null && fis.body.Length > 0)
            {
                var filePath = Path.Combine(uploads, "History.jpg");

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    fis.body.CopyTo(fileStream);
                }

            }
        }
    }
}
