using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Http.Client;
using Volo.Abp.Modularity;
using Volo.Abp.VirtualFileSystem;

namespace Hwl.NewTheme;

[DependsOn(
    typeof(NewThemeApplicationContractsModule),
    typeof(AbpHttpClientModule))]
public class NewThemeHttpApiClientModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        context.Services.AddHttpClientProxies(
            typeof(NewThemeApplicationContractsModule).Assembly,
            NewThemeRemoteServiceConsts.RemoteServiceName
        );

        Configure<AbpVirtualFileSystemOptions>(options =>
        {
            options.FileSets.AddEmbedded<NewThemeHttpApiClientModule>();
        });
    }
}
