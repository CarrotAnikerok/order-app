using System.ComponentModel.DataAnnotations;

namespace FormApp.Api.Models;

public class Order
{
    public int Id { get; set; }
    public string? Number { get; set;}
    [Required]
    public required string SenderCity { get; set; }

    [Required]
    public required string SenderAddress { get; set; }

    [Required]
    public required string RecipientCity { get; set; }

    [Required]
    public required string RecipientAddress { get; set; }

    [Required]
    public required int Weight { get; set; }

    [Required]
    public required string Date { get; set; }
}