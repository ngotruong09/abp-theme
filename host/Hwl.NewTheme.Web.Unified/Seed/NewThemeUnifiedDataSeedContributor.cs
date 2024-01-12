using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.MultiTenancy;
using Volo.Abp.Uow;

namespace Hwl.NewTheme.Seed;

public class NewThemeUnifiedDataSeedContributor : IDataSeedContributor, ITransientDependency
{
    private readonly NewThemeSampleIdentityDataSeeder _sampleIdentityDataSeeder;
    private readonly NewThemeSampleDataSeeder _newThemeSampleDataSeeder;
    private readonly IUnitOfWorkManager _unitOfWorkManager;
    private readonly ICurrentTenant _currentTenant;

    public NewThemeUnifiedDataSeedContributor(
        NewThemeSampleIdentityDataSeeder sampleIdentityDataSeeder,
        IUnitOfWorkManager unitOfWorkManager,
        NewThemeSampleDataSeeder newThemeSampleDataSeeder,
        ICurrentTenant currentTenant)
    {
        _sampleIdentityDataSeeder = sampleIdentityDataSeeder;
        _unitOfWorkManager = unitOfWorkManager;
        _newThemeSampleDataSeeder = newThemeSampleDataSeeder;
        _currentTenant = currentTenant;
    }

    public async Task SeedAsync(DataSeedContext context)
    {
        await _unitOfWorkManager.Current.SaveChangesAsync();

        using (_currentTenant.Change(context?.TenantId))
        {
            await _sampleIdentityDataSeeder.SeedAsync(context);
            await _unitOfWorkManager.Current.SaveChangesAsync();
            await _newThemeSampleDataSeeder.SeedAsync(context);
        }
    }
}
