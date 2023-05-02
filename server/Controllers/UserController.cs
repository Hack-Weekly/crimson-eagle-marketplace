using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using AutoMapper;
using server.Models;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private UserManager<User> userManager;
    private readonly IMapper _mapper;

    public UserController(ServerContext context, UserManager<User> userMgr, IMapper mapper)
    {
        userManager = userMgr;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<GetUser>>> GetUsers()
    {
        return HandleResults(await userManager.Users.ToListAsync());
    }

    [HttpPost]
    public async Task<ActionResult<GetUser>> CreateUser(PostUser data)
    {
        if (ModelState.IsValid)
        {
            User user = new User
            {
                UserName = data.UserName,
                Email = data.Email,
                FullName = data.FullName
            };

            return HandleResults(user, await userManager.CreateAsync(user, data.Password));
        }

        return UnprocessableEntity(ModelState);
    }

    [HttpGet("{email}")]
    public async Task<ActionResult<GetUser>> GetUser(string email)
    {
        var user = await userManager.FindByEmailAsync(email);

        if (user == null)
            return NotFound();

        return HandleResults(user);
    }

    [HttpPut("{email}")]
    public async Task<ActionResult<GetUser>> UpdateUser(string email, PutUser data)
    {
        var user = await userManager.FindByEmailAsync(email);

        if (user == null)
            return NotFound();

        user = _mapper.Map<PutUser, User>(data, user);

        return HandleResults(user, await userManager.UpdateAsync(user));
    }

    [HttpDelete("{email}")]
    public async Task<ActionResult<GetUser>> DeleteUser(string email)
    {
        var user = await userManager.FindByEmailAsync(email);

        if (user == null)
            return NotFound();

        return HandleResults(user, await userManager.DeleteAsync(user));
    }

    private ActionResult<GetUser> HandleResults(User user)
    {
        return Ok(new GetUser
        {
            UserName = user.UserName ?? "ShouldNotBeMising",
            Email = user.Email ?? "email@isrequired.com",
            FullName = user.FullName,
            Addresses = user.Addresses,
        });
    }

    private ActionResult<IEnumerable<GetUser>> HandleResults(List<User> users)
    {
        return Ok(users.Select(user => new GetUser
        {
            UserName = user.UserName ?? "ShouldNotBeMising",
            Email = user.Email ?? "email@isrequired.com",
            FullName = user.FullName,
            Addresses = user.Addresses,
        }));
    }

    private ActionResult<GetUser> HandleResults(User user, IdentityResult result)
    {
        if (result.Succeeded)
        {
            return HandleResults(user);
        }
        else
        {
            foreach (IdentityError error in result.Errors)
            {
                ModelState.AddModelError("", error.Description);
            }
            return UnprocessableEntity(ModelState);
        }
    }
}
