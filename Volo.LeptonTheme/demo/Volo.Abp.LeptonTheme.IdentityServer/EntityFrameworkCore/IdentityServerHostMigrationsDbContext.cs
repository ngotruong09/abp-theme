﻿using Microsoft.EntityFrameworkCore;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using Volo.Abp.BlobStoring.Database.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.FeatureManagement.EntityFrameworkCore;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.IdentityServer.EntityFrameworkCore;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement.EntityFrameworkCore;
using Volo.Saas.EntityFrameworkCore;

namespace Volo.Abp.LeptonTheme.IdentityServer.EntityFrameworkCore;

public class IdentityServerHostMigrationsDbContext : AbpDbContext<IdentityServerHostMigrationsDbContext>
{
    public IdentityServerHostMigrationsDbContext(DbContextOptions<IdentityServerHostMigrationsDbContext> options)
        : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ConfigurePermissionManagement();
        modelBuilder.ConfigureSettingManagement();
        modelBuilder.ConfigureAuditLogging();
        modelBuilder.ConfigureIdentityPro();
        modelBuilder.ConfigureIdentityServer();
        modelBuilder.ConfigureFeatureManagement();
        modelBuilder.ConfigureSaas();
        modelBuilder.ConfigureBlobStoring();
    }
}
