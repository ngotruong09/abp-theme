using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;

namespace Hwl.NewTheme.Pages;

public class IndexModel : NewThemePageModel
{
    public void OnGet()
    {

    }

    public async Task OnPostLoginAsync()
    {
        await HttpContext.ChallengeAsync("oidc");
    }
}
