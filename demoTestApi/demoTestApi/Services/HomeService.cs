
using demoTestApi.Model;
using System.IO;
using demoTestApi.IServices;

namespace demoTestApi.Services
{
    public class HomeService : IHomeService
    {
        public readonly string filePath = @"D:\test\file\jsonFileSaving.json";
        public ReadJsonDto ReadJsonFIle()
        {
            ReadJsonDto readJsonDto = new ReadJsonDto();
            try {
                if (File.Exists(filePath))
                {
                    string file = File.ReadAllText(filePath);
                    readJsonDto = Newtonsoft.Json.JsonConvert.DeserializeObject<ReadJsonDto>(file);
                }
                else
                {
                    readJsonDto = null;
                }
            }catch (Exception ex)
            {
                readJsonDto = null;
            }
            return readJsonDto;
        }

        public Boolean save(ReadJsonDto readJsonDto)
        {
            try
            {
                var jsonFormattedContent = Newtonsoft.Json.JsonConvert.SerializeObject(readJsonDto);

                if (File.Exists(filePath) == false)
                {
                    File.WriteAllText(filePath, jsonFormattedContent);
                }
                else
                {
                    File.Delete(filePath);
                    File.WriteAllText(filePath, jsonFormattedContent);
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        
    }
}
