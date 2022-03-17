using Microsoft.AspNetCore.Mvc;

using demoTestApi.Model;
using demoTestApi.IServices;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace demoTestApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        IHomeService _homeService;

        public HomeController(IHomeService homeService) { 
            _homeService = homeService;
        }

        [HttpGet]
        public ActionResult Get()
        {
            ReadJsonDto readJsonDto = _homeService.ReadJsonFIle();
            if (readJsonDto !=null)
            {
                return Ok(readJsonDto);
            }
            else
            {
                return NotFound();

            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] ReadJsonDto readJsonDto)
        {
           Boolean result = _homeService.save(readJsonDto);

            if (result)
            {
                return Ok(readJsonDto);
            }
            else
            {
                return NotFound();

            }
        }


    }
}
