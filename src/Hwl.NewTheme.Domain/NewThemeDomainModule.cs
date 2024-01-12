using Volo.Abp.Domain;
using Volo.Abp.Modularity;

namespace Hwl.NewTheme;

[DependsOn(
    typeof(AbpDddDomainModule),
    typeof(NewThemeDomainSharedModule)
)]
public class NewThemeDomainModule : AbpModule
{

}
