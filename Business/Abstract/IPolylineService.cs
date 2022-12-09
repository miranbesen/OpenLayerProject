using Entities.Concrete;

namespace Business.Abstract
{
    public interface IPolylineService
    {
   
        List<InfoPolyline> GetList();
        bool Add(InfoPolyline polyline);
        bool Delete(InfoPolyline polyline);

    }
}
