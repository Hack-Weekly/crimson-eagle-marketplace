using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class CartItem
    {
        [Required, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; private set; }

        public required Product Product { get; set; }
        
        public required int Quantity { get; set; } = 1;
    }
}