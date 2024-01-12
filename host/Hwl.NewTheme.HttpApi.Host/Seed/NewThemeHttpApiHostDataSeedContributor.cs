using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.MultiTenancy;

namespace Hwl.NewTheme.Seed;

public class NewThemeHttpApiHostDataSeedContributor : IDataSeedContributor, ITransientDependency
{
    private readonly NewThemeSampleDataSeeder _newThemeSampleDataSeeder;
    private readonly ICurrentTenant _currentTenant;

    public NewThemeHttpApiHostDataSeedContributor(
        NewThemeSampleDataSeeder newThemeSampleDataSeeder,
        ICurrentTenant currentTenant)
    {
        _newThemeSampleDataSeeder = newThemeSampleDataSeeder;
        _currentTenant = currentTenant;
    }

    public async Task SeedAsync(DataSeedContext context)
    {
        using (_currentTenant.Change(context?.TenantId))
        {
            await _newThemeSampleDataSeeder.SeedAsync(context);
        }
    }
}
