using AutoMapper;
using server.Models;

namespace server.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<PutUser, User>()
                .ForMember(src => src.UserName, dest => dest.Condition((_, _, value) => !String.IsNullOrEmpty(value)))
                .ForMember(src => src.Email, dest => dest.Condition((_, _, value) => !String.IsNullOrEmpty(value)))
                .ForMember(src => src.FullName, dest => dest.Condition((_, _, value) => !String.IsNullOrEmpty(value)));
        }
    }
}