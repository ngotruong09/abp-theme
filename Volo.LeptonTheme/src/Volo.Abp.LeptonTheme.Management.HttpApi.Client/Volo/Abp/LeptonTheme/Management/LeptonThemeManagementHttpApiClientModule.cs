using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Http.Client;
using Volo.Abp.Modularity;
using Volo.Abp.VirtualFileSystem;

namespace Volo.Abp.LeptonTheme.Management;

[DependsOn(
    typeof(LeptonThemeManagementApplicationContractsModule),
    typeof(AbpHttpClientModule)
    )]
public class LeptonThemeManagementHttpApiClientModule : AbpModule
{
    public const string RemoteServiceName = "LeptonTheme";

    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        context.Services.AddStaticHttpClientProxies(
            typeof(LeptonThemeManagementApplicationContractsModule).Assembly,
            RemoteServiceName
        );

        Configure<AbpVirtualFileSystemOptions>(options =>
        {
            options.FileSets.AddEmbedded<LeptonThemeManagementHttpApiClientModule>();
        });
    }

    public override void OnApplicationInitialization(ApplicationInitializationContext context)
    {
    }
}
