using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace server.Models;

public class User : IdentityUser
{
    [Required]
    [MaxLength(256)]
    public required string FullName { get; set; }
    public List<Address> Addresses { get; set; } = new List<Address>();
}

public class BaseUser
{
    [Required(ErrorMessage = "Please provide your username.")]
    [MaxLength(256, ErrorMessage = "The username value cannot exceed 255 characters.")]
    public required string UserName { get; set; }
    [Required]
    /* Why is this not working??
    [DataType(DataType.EmailAddress)]
    [EmailAddress] */
    [RegularExpression("^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", ErrorMessage = "Please provide a valid e-mail address.")]
    public required string Email { get; set; }
    [Required(ErrorMessage = "Please provide your full name.")]
    [MaxLength(256, ErrorMessage = "The full name value cannot exceed 255 characters.")]
    public required string FullName { get; set; }
}

public class GetUser : BaseUser
{
    public List<Address> Addresses { get; set; } = new List<Address>();
}

public class PostUser : BaseUser
{
    [Required]
    public required string Password { get; set; }
}

public class PutUser
{
    [MaxLength(256, ErrorMessage = "The username value cannot exceed 255 characters.")]
    public string UserName { get; set; } = String.Empty;
    [RegularExpression("^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", ErrorMessage = "Please provide a valid e-mail address.")]
    public string Email { get; set; } = String.Empty;
    [MaxLength(256, ErrorMessage = "The full name value cannot exceed 255 characters.")]
    public string FullName { get; set; } = String.Empty;
}

public class ChangePasswordUser
{
    [Required]
    public required string OldPassword { get; set; }
    [Required]
    public required string NewPassword { get; set; }
}

public class Address
{
    public int Id { get; set; }
    [Required(ErrorMessage = "Please provide your address.")]
    [MaxLength(256, ErrorMessage = "The address value cannot exceed 255 characters. ")]
    public required string AddressStr { get; set; }
    [Required]
    [MaxLength(256)]
    public required string City { get; set; }
    [Required]
    [DataType(DataType.PostalCode)]
    public required string PostalCode { get; set; }
    [MaxLength(256)]
    public string State { get; set; } = String.Empty;
    [Required]
    [MaxLength(256)]
    public required string Country { get; set; }
}