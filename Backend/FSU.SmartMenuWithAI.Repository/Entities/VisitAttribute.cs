using System;
using System.Collections.Generic;
using FSU.SmartMenuWithAI.Repository.Entities;

namespace FSU.SmartMenuWithAI.Repository.Entities;

public partial class VisitAttribute
{
    public int CustomerVisitId { get; set; }

    public int AttributeId { get; set; }

    public string Value { get; set; } = null!;

    public virtual Attribute Attribute { get; set; } = null!;

    public virtual CustomerVisit CustomerVisit { get; set; } = null!;
}
