using System.Collections.Generic;
using Dapper;

namespace GrePreparation.Extensions
{
	public class DynamicTvpParameters : DynamicParameters, SqlMapper.IDynamicParameters
	{
		private readonly List<SqlMapper.IDynamicParameters> _tvps;

		public DynamicTvpParameters()
			: this(null)
		{
		}

		public DynamicTvpParameters(object template)
			: base(template)
		{
			_tvps = new List<SqlMapper.IDynamicParameters>();
		}

		public DynamicTvpParameters Add(TableValuedParameter param)
		{
			_tvps.Add(param);
			return this;
		}
	}
}