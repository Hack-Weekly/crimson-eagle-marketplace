using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class Cart
    {
        [Required, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; private set; }

        [ForeignKey("User")]
        public string UserId { get; set; }

        public List<CartItem> Items { get; set; } = new List<CartItem>();
    }
}