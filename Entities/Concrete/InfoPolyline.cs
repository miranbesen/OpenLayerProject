using System.Text.Json.Serialization;

namespace Entities.Concrete
{
    public class InfoPolyline
    {   

        public int? Id { get; set; }

        public string Name { get; set; }
        public int Number { get; set; }
        public string Polyline { get; set; }
    }
}
