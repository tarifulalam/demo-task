using demoTestApi.Model;

namespace demoTestApi.IServices
{
    public interface IHomeService
    {
        ReadJsonDto ReadJsonFIle();
        Boolean save(ReadJsonDto readJsonDto);
    }
}
