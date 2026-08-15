using System.Text.Json.Serialization;

public class PageParameters
{
    public int PageNumber {get; set;} = 1;

    public int PageSize {get; set;} = 10;
}
