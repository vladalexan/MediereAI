using System;
using System.Collections.Generic;

#nullable disable

namespace MediereAI.Models
{
    public partial class Medieri
    {
        public decimal Id { get; set; }
        public string Reclamant { get; set; }
        public string Email { get; set; }
        public string Reclamat { get; set; }
        public string EmailReclamat { get; set; }
        public string TelefonReclamat { get; set; }
        public string DataTranzactiei { get; set; }
        public string Subiect { get; set; }
        public string Descriere { get; set; }
        public string StatusMediere { get; set; }
        public string Raspuns { get; set; }
    }
}
