using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.MultiTenancy;

namespace Hwl.NewTheme.Seed;

public class NewThemeIdentityServerDataSeedContributor : IDataSeedContributor, ITransientDependency
{
    private readonly NewThemeSampleIdentityDataSeeder _newThemeSampleIdentityDataSeeder;
    private readonly NewThemeIdentityServerDataSeeder _newThemeIdentityServerDataSeeder;
    private readonly ICurrentTenant _currentTenant;

    public NewThemeIdentityServerDataSeedContributor(
        NewThemeIdentityServerDataSeeder newThemeIdentityServerDataSeeder,
        NewThemeSampleIdentityDataSeeder newThemeSampleIdentityDataSeeder,
        ICurrentTenant currentTenant)
    {
        _newThemeIdentityServerDataSeeder = newThemeIdentityServerDataSeeder;
        _newThemeSampleIdentityDataSeeder = newThemeSampleIdentityDataSeeder;
        _currentTenant = currentTenant;
    }

    public async Task SeedAsync(DataSeedContext context)
    {
        using (_currentTenant.Change(context?.TenantId))
        {
            await _newThemeSampleIdentityDataSeeder.SeedAsync(context);
            await _newThemeIdentityServerDataSeeder.SeedAsync(context);
        }
    }
}
