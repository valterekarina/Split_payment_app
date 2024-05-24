using Microsoft.AspNetCore.Mvc;
using Split_payment.Data;
using Split_payment.Models;

namespace Split_payment.Controllers
{
    [Route("api")]
    [ApiController]
    public class UserUpdatePasswordController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserUpdatePasswordController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPut("update-password")]
        public IActionResult UpdatePassword(UserUpdatePasswordModel model)
        {
            if (ModelState.IsValid)
            {
                var user = _userRepository.GetByEmail(model.EmailOld);
                if (user != null)
                {
                    user.Password = BCrypt.Net.BCrypt.HashPassword(model.Password);

                    _userRepository.Update(user);

                    return Ok(user);
                }
                else
                {
                    return NotFound("User Not Found");
                }
            }
            else
            {
                return BadRequest("Invalid modelstate");
            }
        }
    }
}
