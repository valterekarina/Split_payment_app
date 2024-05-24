using Microsoft.AspNetCore.Mvc;

namespace Split_payment.Controllers
{
    [Route("api")]
    [ApiController]
    public class UserLogOutController : ControllerBase
    {
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            return Ok(new { message = "success" });
        }
    }
}
