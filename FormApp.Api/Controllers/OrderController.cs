using FormApp.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FormApp.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private readonly AppDbContext _context;

    public OrderController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetOrders()
    {
        try
        {
            var orders = await _context.Orders.ToListAsync();
            return Ok(orders);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpGet("{id:int}", Name = "GetOrder")]
    public async Task<IActionResult> GetOrder(int id)
    {
        try
        {
            var order = await _context.Orders.FindAsync(id);

            if (order is null)
            {
                return NotFound();
            }

            return Ok(order);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpPost]
    public async Task<IActionResult> AddOrder(Order order)
    {
        try
        {
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            return CreatedAtRoute("GetOrder", new{id = order.Id}, order);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }
}
