using Volo.Abp.Autofac;
using Volo.Abp.Http.Client.IdentityModel;
using Volo.Abp.Modularity;

namespace Hwl.NewTheme;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(NewThemeHttpApiClientModule),
    typeof(AbpHttpClientIdentityModelModule)
    )]
public class NewThemeConsoleApiClientModule : AbpModule
{

}
