namespace Volo.Abp.LeptonTheme.Management;

public static class LeptonThemeSettingNames
{
    private const string DefaultPrefix = "Volo.Abp.LeptonTheme";

    public const string Style = DefaultPrefix + ".Style";
    public const string PublicLayoutStyle = DefaultPrefix + ".Style.PublicLayout";

    public static class Layout
    {
        private const string LayoutPrefix = DefaultPrefix + ".Layout";

        public const string Boxed = LayoutPrefix + ".Boxed";

        public const string MenuPlacement = LayoutPrefix + ".MenuPlacement";

        public const string MenuStatus = LayoutPrefix + ".MenuStatus";
    }
}
