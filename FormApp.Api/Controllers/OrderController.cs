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
    public async Task<IActionResult> GetOrders([FromQuery] PageParameters pageParameters)
    {
        try
        {
            var ordersQuery = _context.Orders.AsQueryable();
            var sortedQuery = ordersQuery.OrderByDescending(o => o.Id);
            var pagedQuery = await PagedList<Order>.CreateAsync(
                sortedQuery, pageParameters.PageNumber, pageParameters.PageSize
                );
            return Ok(pagedQuery);
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
    public async Task<IActionResult> AddOrder([FromBody] Order order)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            order.Number = Guid.NewGuid().ToString().Replace("-","")[..8];
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
