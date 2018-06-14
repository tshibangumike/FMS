using System;
using log4net;

namespace fms.Service
{
    public class Log4NetService
    {
        public static ILog GetLog4Net(Type classType)
        {
            log4net.Config.XmlConfigurator.Configure();
            return LogManager.GetLogger(classType);
        }
    }
}
