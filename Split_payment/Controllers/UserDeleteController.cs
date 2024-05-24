using Microsoft.AspNetCore.Mvc;
using Split_payment.Data;
using Split_payment.Models;

namespace Split_payment.Controllers
{
    [Route("api")]
    [ApiController]
    public class UserDeleteController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserDeleteController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpDelete("delete")]
        public IActionResult Delete(UserDeleteProfileModel model)
        {
            if (ModelState.IsValid)
            {
                var user = _userRepository.GetByEmail(model.EmailOld);

                if (user == null)
                {
                    return NotFound("user not found");
                }

                _userRepository.Delete(user);
                Response.Cookies.Delete("jwt");
                return Ok("user deleted");
            }
            else
            {
                return BadRequest("Invalid modelstate");
            }
        }
    }
}
