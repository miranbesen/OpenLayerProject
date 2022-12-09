using Business.Abstract;
using Entities.Concrete;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PolylineController : ControllerBase
    {
        private IPolylineService _polylineService;

        public PolylineController(IPolylineService polylineService)
        {
            _polylineService = polylineService;
        }

        [HttpGet(template: "getall")]
        public ActionResult GetList()
        {
            return new JsonResult(_polylineService.GetList());


        }

       
        [HttpPost(template: "add")]
        public ActionResult Add(InfoPolyline polyline)
        {
            var result = _polylineService.Add(polyline);
           return new JsonResult(result);
        }

        [HttpPost(template: "delete")]
        public ActionResult Delete(InfoPolyline polyline)
        {
            var result = _polylineService.Delete(polyline);
            return new JsonResult(result);
        }

    }
}
