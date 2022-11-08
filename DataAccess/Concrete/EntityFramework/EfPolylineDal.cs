
using DataAccess.Abstract;
using Entities.Concrete;
using Newtonsoft.Json;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfPolylineDal : IPolylineDal
    {
        List<InfoPolyline> polylineList = new List<InfoPolyline>();
        string workingDirectory = Environment.CurrentDirectory;

        public bool Add(InfoPolyline polyline)
        {
            try
            {

                workingDirectory += "\\InfoPolyline.json";
                using (StreamReader sr = new StreamReader(workingDirectory))
                {
                    string json = sr.ReadToEnd();
                    polylineList = JsonConvert.DeserializeObject<List<InfoPolyline>>(json);
                }

                using (StreamWriter sw = new StreamWriter(workingDirectory))
                {
                    polylineList = polylineList ?? new List<InfoPolyline>();
                    var lastItem = polylineList.LastOrDefault();
                    var result = new InfoPolyline();
                    result.Name = polyline.Name;
                    result.Number = polyline.Number;
                    result.Polyline = polyline.Polyline;
                    result.Id = lastItem != null ? lastItem.Id + 1 : 1;
                    polylineList.Add(result);
                    var convertedJson = JsonConvert.SerializeObject(polylineList, Formatting.Indented);
                    sw.Write(convertedJson);
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public List<InfoPolyline> GetList()
        {
            workingDirectory += "\\InfoPolyline.json";

            using (StreamReader sr = new StreamReader(workingDirectory))
            {
                string json = sr.ReadToEnd();

                polylineList = json != null ? JsonConvert.DeserializeObject<List<InfoPolyline>>(json) : new List<InfoPolyline>(); 
            }
            return polylineList;
        }
    }
}
