
using HotelManagment.Domain.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System.Security.Cryptography.Xml;
using Microsoft.IdentityModel.Tokens;
using HotelManagment.Application.Implementation.Helper;
using System.Text;
namespace HotelManagment.API
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);

			// Add services to the container.
			builder.Services.AddDbContext<HMS4Context>(
	options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
			builder.Services.AddControllers();
			// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
			builder.Services.AddOpenApi();
			builder.Services.AddSwaggerGen(options =>
			{
				options.SwaggerDoc("v1", new OpenApiInfo
				{
					Title = "Swagger",
					Contact = new OpenApiContact
					{
						Email = "atakieeldeen@gmail.com",
						Name = "Taqeyy"
					}
				});
				options.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme , new OpenApiSecurityScheme { In=ParameterLocation.Header,Name="Authorization",Scheme=JwtBearerDefaults.AuthenticationScheme});
				options.AddSecurityRequirement(new OpenApiSecurityRequirement {
					{
						new OpenApiSecurityScheme
						{
							Reference=new OpenApiReference{Type=ReferenceType.SecurityScheme,Id=JwtBearerDefaults.AuthenticationScheme},In=ParameterLocation.Header,Scheme=JwtBearerDefaults.AuthenticationScheme,Name="Authorization"
						},new List<string>()
					}

				}); 
			}
			);
			builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("Jwt"));
			var Section = builder.Configuration.GetSection("Jwt");
			var settings = Section.Get<JwtSettings>();
			builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options=>
			{
				options.TokenValidationParameters = new TokenValidationParameters
				{
					ValidateAudience = true,
					ValidateIssuer = true,
					ValidateIssuerSigningKey = true,
					ValidateLifetime = true,
					ValidIssuer = settings.issuer,
					ValidAudience = settings.audience,
					ClockSkew = TimeSpan.Zero,
					IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(settings.key))
				};
			
			
			
			}
			);
			var app = builder.Build();

			// Configure the HTTP request pipeline.
			if (app.Environment.IsDevelopment())
			{
				app.MapOpenApi();
				app.UseSwagger();
				app.UseSwaggerUI();
			}

			app.UseHttpsRedirection();
			app.UseAuthentication();
			app.UseAuthorization();


			app.MapControllers();

			app.Run();
		}
	}
}
