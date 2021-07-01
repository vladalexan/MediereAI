using System;
using System.Collections.Generic;

#nullable disable

namespace MediereAI.Models
{
    public partial class Utilizatori
    {
        public decimal Id { get; set; }
        public string Nume { get; set; }
        public string Prenume { get; set; }
        public string Email { get; set; }
        public string Telefon { get; set; }
        public string Parola { get; set; }
        public decimal Verificat { get; set; }
        public decimal? Counter { get; set; }
    }
}
