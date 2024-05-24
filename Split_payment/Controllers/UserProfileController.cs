using Microsoft.AspNetCore.Mvc;
using Split_payment.Data;
using Split_payment.Services;

namespace Split_payment.Controllers
{
    [Route("api")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly JWTService _jwtService;

        public UserProfileController(IUserRepository userRepository, JWTService jwtService)
        {
            _userRepository = userRepository;
            _jwtService = jwtService;
        }

        [HttpGet("profile")]
        public IActionResult Profile()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwt);
                int userId = int.Parse(token.Issuer);
                var user = _userRepository.GetById(userId);

                return Ok(user);
            }
            catch
            {
                return Unauthorized();
            }

        }
    }
}
