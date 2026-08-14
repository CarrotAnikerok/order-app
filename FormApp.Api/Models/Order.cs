using System.ComponentModel.DataAnnotations;

namespace FormApp.Api.Models;

public class Order
{
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public required string SenderCity { get; set; }

    [Required]
    [MaxLength(50)]
    public required string SenderAddress { get; set; }

    [Required]
    [MaxLength(50)]
    public required string RecipientCity { get; set; }

    [Required]
    [MaxLength(50)]
    public required string RecipientAddress { get; set; }

    // make required
    public int Weight { get; set; }

    // make required
    public int Date { get; set; }
}