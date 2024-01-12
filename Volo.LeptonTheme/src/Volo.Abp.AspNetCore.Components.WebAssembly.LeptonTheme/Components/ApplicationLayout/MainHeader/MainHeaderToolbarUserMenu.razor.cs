using System;
using System.Text;
using System.Threading.Tasks;
using Localization.Resources.AbpUi;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Components.Routing;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using Microsoft.JSInterop;
using Volo.Abp.Http.Client;
using Volo.Abp.MultiTenancy;
using Volo.Abp.UI.Navigation;
using Volo.Abp.Users;

namespace Volo.Abp.AspNetCore.Components.WebAssembly.LeptonTheme.Components.ApplicationLayout.MainHeader;

public partial class MainHeaderToolbarUserMenu : IDisposable
{
    [Inject]
    protected IMenuManager MenuManager { get; set; }

    [Inject]
    protected ICurrentUser CurrentUser { get; set; }

    [Inject]
    protected ICurrentTenant CurrentTenant { get; set; }

    [Inject]
    protected SignOutSessionStateManager SignOutManager { get; set; }

    [Inject]
    protected NavigationManager Navigation { get; set; }

    [Inject]
    protected AuthenticationStateProvider AuthenticationStateProvider { get; set; }

    [Inject]
    protected IStringLocalizer<AbpUiResource> UiLocalizer { get; set; }

    [Inject]
    protected IOptions<AbpRemoteServiceOptions> RemoteServiceOptions { get; set; }

    [Inject]
    protected IJSRuntime JsRuntime { get; set; }

    protected ApplicationMenu UserMenu { get; set; }

    protected Guid? UserId { get; set; }

    protected string UserName { get; set; }

    protected string TenantName { get; set; }

    protected string ProfileImageUrl { get; set; }

    protected string UserFullName { get; set; }

    protected override async Task OnInitializedAsync()
    {
        await SetUserMenuAndProfileAsync();

        Navigation.LocationChanged += OnLocationChanged;
        AuthenticationStateProvider.AuthenticationStateChanged += AuthenticationStateProviderOnAuthenticationStateChanged;
    }

    private async Task SetUserMenuAndProfileAsync()
    {
        UserMenu = await MenuManager.GetAsync(StandardMenus.User);

        UserId = CurrentUser.Id;
        UserName = CurrentUser.UserName;
        UserFullName = CalculateUserFullName();
        TenantName = CurrentTenant.Name;

        if (UserId != null)
        {
            ProfileImageUrl = RemoteServiceOptions.Value.RemoteServices.Default?.BaseUrl?.TrimEnd('/') +
                              $"/api/account/profile-picture-file/{UserId}";
        }
    }

    protected virtual void OnLocationChanged(object sender, LocationChangedEventArgs e)
    {
        InvokeAsync(StateHasChanged);
    }

    private async void AuthenticationStateProviderOnAuthenticationStateChanged(Task<AuthenticationState> task)
    {
        await SetUserMenuAndProfileAsync();
        await InvokeAsync(StateHasChanged);
    }

    protected virtual async Task BeginSignOut()
    {
        await SignOutManager.SetSignOutState();
        await NavigateToAsync("authentication/logout");
    }

    protected virtual async Task NavigateToAsync(string uri, string target = null)
    {
        if (target == "_blank")
        {
            await JsRuntime.InvokeVoidAsync("open", uri, target);
        }
        else
        {
            Navigation.NavigateTo(uri);
        }

    }

    protected virtual string CalculateUserFullName()
    {
        //TODO: Should we move this logic to some extension method for the ICurrentUser?

        var fullName = new StringBuilder();

        if (!CurrentUser.Name.IsNullOrEmpty())
        {
            fullName.Append(CurrentUser.Name);
        }

        if (!CurrentUser.SurName.IsNullOrEmpty())
        {
            if (fullName.Length > 0)
            {
                fullName.Append(" ");
            }

            fullName.Append(CurrentUser.SurName);
        }

        if (fullName.Length == 0)
        {
            fullName.Append(CurrentUser.UserName);
        }

        return fullName.ToString();
    }

    public void Dispose()
    {
        Navigation.LocationChanged -= OnLocationChanged;
        AuthenticationStateProvider.AuthenticationStateChanged -= AuthenticationStateProviderOnAuthenticationStateChanged;
    }
}
