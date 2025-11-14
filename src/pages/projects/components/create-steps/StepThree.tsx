import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Check, X, Loader2 } from 'lucide-react';
import { projectService } from '../../services/projectService';
import { ProjectFormData, EmployeeMatch, AllocationPercentage } from '../../types/projects';
import { toast } from 'sonner';
interface StepThreeProps {
  formData: ProjectFormData;
  setFormData: (data: ProjectFormData) => void;
}
export default function StepThree({
  formData,
  setFormData
}: StepThreeProps) {
  const [matches, setMatches] = useState<EmployeeMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
  useEffect(() => {
    if (formData.required_skills.length > 0) {
      loadMatches();
    }
  }, [formData.required_skills]);
  const loadMatches = async () => {
    try {
      setLoading(true);
      const data = await projectService.findMatchingEmployees(formData.required_skills);
      setMatches(data);
    } catch (error) {
      console.error('Error loading matches:', error);
      toast.error('Failed to load employee matches');
    } finally {
      setLoading(false);
    }
  };
  const addMember = (userId: string, allocation: AllocationPercentage) => {
    const match = matches.find(m => m.user_id === userId);
    if (!match) return;
    if (allocation > match.available_capacity) {
      toast.error(`${match.full_name} only has ${match.available_capacity}% capacity available`);
      return;
    }
    const exists = formData.members.some(m => m.user_id === userId);
    if (exists) {
      toast.error('User already added');
      return;
    }
    setFormData({
      ...formData,
      members: [...formData.members, {
        user_id: userId,
        allocation_percentage: allocation
      }]
    });
  };
  const removeMember = (userId: string) => {
    setFormData({
      ...formData,
      members: formData.members.filter(m => m.user_id !== userId)
    });
  };
  const updateAllocation = (userId: string, allocation: AllocationPercentage) => {
    const match = matches.find(m => m.user_id === userId);
    if (!match) return;
    if (allocation > match.available_capacity) {
      toast.error(`${match.full_name} only has ${match.available_capacity}% capacity available`);
      return;
    }
    setFormData({
      ...formData,
      members: formData.members.map(m => m.user_id === userId ? {
        ...m,
        allocation_percentage: allocation
      } : m)
    });
  };
  const getCapacityColor = (available: number) => {
    if (available >= 50) return 'text-green-600';
    if (available >= 25) return 'text-yellow-600';
    return 'text-red-600';
  };
  const getCapacityBadge = (available: number) => {
    if (available >= 50) return '🟢';
    if (available >= 25) return '🟡';
    return '🔴';
  };
  if (loading) {
    return <div className="flex items-center justify-center h-full min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>;
  }
  return <div className="space-y-2 h-full flex flex-col min-h-0">
      <div className="flex-shrink-0">
        <h3 className="text-xs font-semibold mb-1">Assigned Members ({formData.members.length})</h3>
        {formData.members.length === 0 ? <p className="text-xs text-muted-foreground">No members assigned yet</p> : <div className="space-y-1 max-h-[140px] overflow-y-auto pr-1">
            {formData.members.map(member => {
          const match = matches.find(m => m.user_id === member.user_id);
          if (!match) return null;
          return <div key={member.user_id} className="flex items-center justify-between p-1.5 border rounded">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{match.full_name}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <select value={member.allocation_percentage} onChange={e => updateAllocation(member.user_id, Number(e.target.value) as AllocationPercentage)} className="text-xs border rounded px-1.5 py-0.5">
                      <option value={25}>25%</option>
                      <option value={50}>50%</option>
                      <option value={75}>75%</option>
                      <option value={100}>100%</option>
                    </select>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => removeMember(member.user_id)}>
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>;
        })}
          </div>}
      </div>

      <div className="flex-1 min-h-0 flex flex-col">
        <h3 className="text-xs font-semibold mb-1 flex-shrink-0">Suggested Employees</h3>
        <div className="space-y-1.5 flex-1 overflow-y-auto pr-1">
          {matches.map(match => {
          const isAssigned = formData.members.some(m => m.user_id === match.user_id);
          const isExpanded = expandedUserId === match.user_id;
          return <div key={match.user_id} className="border rounded-lg">
                <div className="p-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-medium">{match.full_name}</p>
                        <Badge variant={match.match_percentage >= 70 ? 'default' : 'secondary'} className="text-xs h-5 px-1.5">
                          {match.match_percentage}% match
                        </Badge>
                        <span className="text-base">{getCapacityBadge(match.available_capacity)}</span>
                      </div>
                      
                      <div className="mt-1.5">
                        <div className="flex items-center gap-1.5 text-xs">
                          <span className={getCapacityColor(match.available_capacity)}>
                            {match.available_capacity}% available
                          </span>
                          <span className="text-muted-foreground">({match.current_total_allocation}% allocated)</span>
                        </div>
                        <Progress value={match.current_total_allocation} className="mt-1 h-1.5" />
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      {!isAssigned && <>
                          <Button size="sm" variant="outline" className="h-7 px-2 text-xs" onClick={() => addMember(match.user_id, 25)}>
                            + 25%
                          </Button>
                          <Button size="sm" variant="outline" className="h-7 px-2 text-xs" onClick={() => addMember(match.user_id, 50)}>
                            + 50%
                          </Button>
                        </>}
                      <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={() => setExpandedUserId(isExpanded ? null : match.user_id)}>
                        {isExpanded ? 'Hide' : 'Details'}
                      </Button>
                    </div>
                  </div>

                  {isExpanded && <div className="mt-2 pt-2 border-t space-y-0.5">
                      <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Skill Match Details</p>
                      {match.skill_details.map((detail, idx) => <div key={idx} className="flex items-center justify-between text-xs py-0.5">
                          <span className="text-muted-foreground">
                            {detail.skill_name} → {detail.subskill_name}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <Badge variant={detail.matches ? 'default' : 'destructive'} className="text-xs h-5 px-1.5">
                              {detail.user_rating.toUpperCase()} / {detail.required_rating.toUpperCase()}
                            </Badge>
                            {detail.matches ? <Check className="h-3.5 w-3.5 text-green-600" /> : <X className="h-3.5 w-3.5 text-red-600" />}
                          </div>
                        </div>)}
                    </div>}
                </div>
              </div>;
        })}
        </div>
      </div>
    </div>;
}