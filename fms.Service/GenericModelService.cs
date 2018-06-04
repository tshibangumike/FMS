using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace fms.Service
{
    public class GenericModelService
    {
        public static object GetAttributeValue(Dictionary<string, object> keyValue, string key)
        {
            if (!keyValue.Any(x => x.Key == key))
                return null;
            return keyValue.FirstOrDefault(x => x.Key == key).Value;
        }
        public static void SetAttribute(List<KeyValue> keyValue, string key, string value)
        {
            if (keyValue.Any(x => x.Key == key))
            {
                keyValue.FirstOrDefault(x => x.Key == key).Value = value;
            }
        }
        public static void SetOrAddAttribute(List<KeyValue> keyValue, string key, string value)
        {
            if (keyValue.Any(x => x.Key == key))
            {
                keyValue.FirstOrDefault(x => x.Key == key).Value = value;
            }
            else
            {
                keyValue.Add(new KeyValue()
                {
                    Key = key,
                    Value = value
                });
            }
        }
        public static void AddAttribute(List<KeyValue> keyValue, string key, string value)
        {
            keyValue.Add(new KeyValue()
            {
                Key = key,
                Value = value
            });
        }
        public static void AddAuditAttributeForCreateEvent(List<KeyValue> keyValue, string currentUserId)
        {
            KeyValueService.AddAttribute(keyValue, "CreatedById", currentUserId);
            KeyValueService.AddAttribute(keyValue, "ModifiedById", currentUserId);
            KeyValueService.AddAttribute(keyValue, "CreatedOn", DateTime.Now.ToString());
            KeyValueService.AddAttribute(keyValue, "ModifiedOn", DateTime.Now.ToString());
        }
    }
}
