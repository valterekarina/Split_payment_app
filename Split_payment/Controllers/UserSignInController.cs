using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Split_payment.Data;
using Split_payment.Models;
using Split_payment.Services;

namespace Split_payment.Controllers
{
    [Route("api")]
    [ApiController]
    public class UserSignInController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly JWTService _jwtService;

        public UserSignInController(IUserRepository userRepository, JWTService jwtService)
        {
            _userRepository = userRepository;
            _jwtService = jwtService;
        }

        [HttpPost("login")]
        public IActionResult Login(User model)
        {
            var user = _userRepository.GetByEmail(model.Email);

            if (user == null)
            {
                return BadRequest(new { message = "Invalid Email" });
            }

            if (!BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
            {
                return BadRequest(new { message = "Invalid Password" });
            }

            var jwt = _jwtService.Generate(user.Id);

            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true,
                //SameSite = SameSiteMode.None,
                ////Secure = true, // Set to true if served over HTTPS
                //Expires = DateTimeOffset.Now.AddDays(1),
            });

            return Ok(user);
        }
    }
}
