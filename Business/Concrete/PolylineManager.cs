using Business.Abstract;
using DataAccess.Abstract;
using Entities.Concrete;

namespace Business.Concrete
{
    public class PolylineManager : IPolylineService
    {
        private IPolylineDal _polylineDal;

        public PolylineManager(IPolylineDal polylineDal)
        {
            _polylineDal = polylineDal;
        }

        public bool Add(InfoPolyline polyline)
        {
           return _polylineDal.Add(polyline);
        }

        public List<InfoPolyline> GetList()
        {
            return _polylineDal.GetList();
        }
    }
}
