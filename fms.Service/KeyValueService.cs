using System.Collections.Generic;
using System.Linq;

namespace fms.Service
{
    public class KeyValueService
    {
        public static string GetAttributeValue(List<KeyValue> keyValue, string key)
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
        public static bool HasAttribute(List<KeyValue> keyValue, string key)
        {
            return keyValue.Any(x => x.Key == key);
        }
        public static bool AttributeContainsValue(List<KeyValue> keyValue, string key)
        {
            return keyValue.Any(x => x.Key == key && x.Value != null);
        }
    }
}
