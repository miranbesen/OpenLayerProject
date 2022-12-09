
using Entities.Concrete;

namespace DataAccess.Abstract
{
    public interface IPolylineDal
    {
        bool Add(InfoPolyline polyline);
        List<InfoPolyline> GetList();
        bool Delete(InfoPolyline polyline);
    }
}
