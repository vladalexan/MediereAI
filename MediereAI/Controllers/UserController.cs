using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using MediereAI.Models;
using MediereAI.AuxClasses;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace MediereAI.Controllers
{
    [Route("api/login")]
    [ApiController]
    public class UtilizatorisController : ControllerBase
    {
        MediereAIContext DB = new MediereAIContext();

        [Route("Login")]
        [HttpPost]                                                                                                                                                            
        public Returned UtilizatoriLogin(Login login)
        {
            var log = DB.Utilizatori.Where(x => x.Email.Equals(login.Email) &&
                      x.Parola.Equals(login.Password)).FirstOrDefault();

            if (log == null)
            {
                return new Returned { Status = "Invalid", Message = "Invalid User.", FirstName = "", LastName = "", Verificat = 0 };
            }
            else
            {
                return new Returned { Status = "Success", Message = "Login Successfully", FirstName = log.Prenume, LastName = log.Nume, Verificat = log.Verificat };
            }
        }

        [Route("Nume")]
        [HttpPost]
        public Name Numele()
        {
            Name a = new Name();
            List<string> aux = new List<string>();
            aux.Add("-");
            a.nume = aux;
            List<string> aux2 = new List<string>();
            aux2.Add("-");
            a.prenume = aux2;
            var log1 = DB.Utilizatori.Select(x => x.Nume).Distinct().ToList();
            var log2 = DB.Utilizatori.Select(x => x.Prenume).Distinct().ToList();
            foreach (var x in log1)
            {
                aux.Add(x);
                a.nume = aux;
            }
            foreach (var x in log2)
            {
                aux2.Add(x);
                a.prenume = aux2;
            }

            return a;
        }

        [Route("Emails")]
        [HttpPost]
        public List<object> Utilizator(ObiectMeniu a)
        {
            List<Utilizatori> log = new List<Utilizatori>();
            if (a.nume == "-" && a.prenume == "-")
            {
                log = DB.Utilizatori.Where(x => (x.Email != null)).ToList<Utilizatori>();

            }
            if (a.nume != "-" && a.prenume == "-")
            {
                log = DB.Utilizatori.Where(x => (x.Email != null && x.Nume == a.nume)).ToList<Utilizatori>();
            }

            if (a.nume == "-" && a.prenume != "-")
            {
                log = DB.Utilizatori.Where(x => (x.Email != null && x.Prenume == a.prenume)).ToList<Utilizatori>();
            }

            if (a.nume != "-" && a.prenume != "-")
            {
                log = DB.Utilizatori.Where(x => (x.Email != null && x.Prenume == a.prenume && x.Nume == a.nume)).ToList<Utilizatori>();
            }


            List<object> emails = new List<object>();
            for (int i = 0; i < log.Count(); i++)
            {
                emails.Add(new ObiectMeniu { id = i, name = log[i].Email, nume = log[i].Nume, prenume = log[i].Prenume, state = "inactive" });//in forma asta pentru Accordion.js
            }

            return emails;
        }

        [Route("Counter")]
        [HttpPost]
        public void Counter(Login x)
        {
            if (x.Password == "Persoana")
            {
                var result = DB.Utilizatori.SingleOrDefault(a => a.Email == x.Email);
                if (result != null)
                {
                    result.Counter += 1;
                    DB.SaveChanges();
                }
            }
        }

        [Route("Insert")]
        [HttpPost]
        public object InsertUtilizator(Register Reg)
        {
            try
            {
                Utilizatori EL = new Utilizatori();
                var result = DB.Utilizatori.SingleOrDefault(a => a.Email == Reg.Email);
                var result2 = DB.Setari.SingleOrDefault();
                if (result == null)
                {
                    //adaugare in baza de date
                    EL.Nume = Reg.LastName;
                    EL.Prenume = Reg.FirstName;
                    EL.Email = Reg.Email;
                    EL.Parola = Reg.Password;
                    EL.Telefon = Reg.Phone;
                    EL.Verificat = Reg.Verificat;
                    EL.Counter = Reg.Counter;
                    DB.Utilizatori.Add(EL);
                    DB.SaveChanges();
                    IConfigurationRoot configuration = new ConfigurationBuilder()
                                                            .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                                                            .AddJsonFile("appsettings.json")
                                                            .Build();
                    var server = configuration.GetSection("ConnectionStrings").GetSection("Server").Value;
                    if (Reg.Verificat == 0)
                    {
                        //trimitere email
                        string url = server+"/api/login/Validate";
                        var param = Reg.Email;
                        var link = url + "?email=" + param;
                        MailMessage mail = new MailMessage(result2.Email, Reg.Email, "Account Confirmation", "Click on the link:<a href=\"" + link + "\">here</a>");//email client
                        mail.IsBodyHtml = true;
                        SmtpClient smtpClient = new SmtpClient("smtp.gmail.com");
                        smtpClient.Port = 587;
                        smtpClient.Credentials = new System.Net.NetworkCredential(result2.Email, result2.Parola);
                        smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                        smtpClient.EnableSsl = true;
                        smtpClient.Send(mail);
                    }
                    return new Returned
                    { Status = "Success", Message = "Record SuccessFully Saved.", FirstName = "", LastName = "" };
                }
            }
            catch (Exception)
            {
                return new Returned
                { Status = "Exists", Message = "Account already exists.", FirstName = "", LastName = "" };
            }
            return new Returned
            { Status = "Error", Message = "Invalid Data." };
        }
        
        [Route("InsertForm")]
        [HttpPost]
        public object InsertForm(Register Reg)
        {
            try
            {
                Utilizatori EL = new Utilizatori();
                var result = DB.Utilizatori.SingleOrDefault(a => a.Email == Reg.Email);
                var result2 = DB.Setari.SingleOrDefault();
                if (result == null)
                {
                    //adaugare in baza de date
                    EL.Nume = Reg.LastName;
                    EL.Prenume = Reg.FirstName;
                    EL.Email = Reg.Email;
                    EL.Telefon = Reg.Phone;
                    EL.Verificat = Reg.Verificat;
                    EL.Counter = Reg.Counter;
                    const string valid = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
                    StringBuilder res = new StringBuilder();
                    Random rnd = new Random();
                    var length = 7;
                    while (0 < length--)
                    {
                        res.Append(valid[rnd.Next(valid.Length)]);
                    }
                    EL.Parola = res.ToString();
                    DB.Utilizatori.Add(EL);
                    DB.SaveChanges();
                    IConfigurationRoot configuration = new ConfigurationBuilder()
                                                            .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                                                            .AddJsonFile("appsettings.json")
                                                            .Build();
                    var server = configuration.GetSection("ConnectionStrings").GetSection("Server").Value;
                    if (Reg.Verificat == 0)
                    {
                        //trimitere email
                        string url = server+"/api/login/Validate";
                        var param = Reg.Email;
                        var link = url + "?email=" + param;
                        MailMessage mail = new MailMessage(result2.Email, Reg.Email, "Account Confirmation", "Click on the link:<a href=\"" + link + "\">here</a>");//email client
                        mail.IsBodyHtml = true;
                        SmtpClient smtpClient = new SmtpClient("smtp.gmail.com");
                        smtpClient.Port = 587;
                        smtpClient.Credentials = new System.Net.NetworkCredential(result2.Email, result2.Parola);
                        smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                        smtpClient.EnableSsl = true;
                        smtpClient.Send(mail);
                    }
                    return new Returned
                    { Status = "Success", Message = "Record SuccessFully Saved.", FirstName = "", LastName = "" };
                }
            }
            catch (Exception)
            {
                return new Returned
                { Status = "Exists", Message = "Account already exists.", FirstName = "", LastName = "" };
            }
            return new Returned
            { Status = "Error", Message = "Invalid Data." };
        }

        [Route("Validate")]
        [HttpGet]
        public void ValidateUtilizator(string email)
        {
            var result = DB.Utilizatori.SingleOrDefault(a => a.Email == email);
            if (result != null)
            {
                try
                {
                    result.Verificat = 1;
                    DB.SaveChanges();
                }
                catch (Exception e)
                {

                }
            }

            IConfigurationRoot configuration = new ConfigurationBuilder()
                                                            .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                                                            .AddJsonFile("appsettings.json")
                                                            .Build();
            var server = configuration.GetSection("ConnectionStrings").GetSection("Server").Value;

            Response.Redirect(server);
        }
    }
}