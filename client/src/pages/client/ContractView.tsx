import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, 
  FileText, 
  Download, 
  MessageSquare, 
  Plus, 
  Calendar, 
  DollarSign,
  User,
  Clock,
  CheckCircle,
  Edit3,
  Trash2,
  Reply,
  MoreVertical
} from "lucide-react";
import { Link } from "wouter";
import { format } from "date-fns";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function ClientContractView() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [, params] = useRoute("/contracts/:id");
  const contractId = params?.id;

  const [newComment, setNewComment] = useState("");
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  // Fetch contract details
  const { data: contract, isLoading: contractLoading } = useQuery({
    queryKey: ["/api/contracts", contractId],
    enabled: !!contractId,
  });

  // Fetch contract comments
  const { data: comments, isLoading: commentsLoading } = useQuery({
    queryKey: ["/api/contracts", contractId, "comments"],
    enabled: !!contractId,
  });

  // Add comment mutation
  const addCommentMutation = useMutation({
    mutationFn: async (data: { comment: string; lineNumber?: number; parentCommentId?: number }) => {
      return await apiRequest(`/api/contracts/${contractId}/comments`, {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Comment added successfully",
        variant: "default",
      });
      setNewComment("");
      setSelectedLine(null);
      setShowCommentDialog(false);
      setReplyingTo(null);
      setReplyText("");
      queryClient.invalidateQueries({ queryKey: ["/api/contracts", contractId, "comments"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive",
      });
    },
  });

  // Resolve comment mutation
  const resolveCommentMutation = useMutation({
    mutationFn: async (commentId: number) => {
      return await apiRequest(`/api/contracts/${contractId}/comments/${commentId}/resolve`, {
        method: "PATCH",
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Comment resolved",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/contracts", contractId, "comments"] });
    },
  });

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    addCommentMutation.mutate({
      comment: newComment,
      lineNumber: selectedLine || undefined,
    });
  };

  const handleReply = (commentId: number) => {
    if (!replyText.trim()) return;
    
    addCommentMutation.mutate({
      comment: replyText,
      parentCommentId: commentId,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100";
    }
  };

  if (contractLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-navyblue"></div>
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Contract not found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">The contract you're looking for doesn't exist or you don't have access to it.</p>
          <Link href="/contracts">
            <Button>Back to Contracts</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/contracts">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Contracts
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-navyblue dark:text-golden">{contract.name}</h1>
                <p className="text-gray-600 dark:text-gray-400">{contract.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className={getStatusColor(contract.status)}>
                {contract.status.replace('_', ' ').toUpperCase()}
              </Badge>
              {contract.pdfUrl && (
                <Button 
                  variant="outline" 
                  onClick={() => window.open(contract.pdfUrl, '_blank')}
                  className="border-navyblue text-navyblue hover:bg-navyblue hover:text-white dark:border-golden dark:text-golden"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contract Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contract Info */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-navyblue dark:text-golden">Contract Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Contract Date</Label>
                    <div className="flex items-center mt-1">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-900 dark:text-white">
                        {format(new Date(contract.contractDate), "MMMM dd, yyyy")}
                      </span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Contract Value</Label>
                    <div className="flex items-center mt-1">
                      <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-900 dark:text-white">
                        {contract.contractValue ? `₹${contract.contractValue.toLocaleString()}` : "Not specified"}
                      </span>
                    </div>
                  </div>
                </div>
                
                {contract.startDate && contract.endDate && (
                  <div>
                    <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Contract Period</Label>
                    <div className="flex items-center mt-1">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-900 dark:text-white">
                        {format(new Date(contract.startDate), "MMM dd, yyyy")} - {format(new Date(contract.endDate), "MMM dd, yyyy")}
                      </span>
                    </div>
                  </div>
                )}

                {contract.assignedEmployee && (
                  <div>
                    <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Assigned Employee</Label>
                    <div className="flex items-center mt-1">
                      <User className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-900 dark:text-white">
                        {contract.assignedEmployee.firstName} {contract.assignedEmployee.lastName}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* PDF Viewer */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-navyblue dark:text-golden">Contract Document</CardTitle>
                <Dialog open={showCommentDialog} onOpenChange={setShowCommentDialog}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-navyblue hover:bg-darkblue text-white dark:bg-golden dark:hover:bg-goldenrod1 dark:text-navyblue">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Comment
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Comment</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="lineNumber">Line Number (Optional)</Label>
                        <Input
                          id="lineNumber"
                          type="number"
                          value={selectedLine || ""}
                          onChange={(e) => setSelectedLine(e.target.value ? parseInt(e.target.value) : null)}
                          placeholder="Enter line number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="comment">Comment</Label>
                        <Textarea
                          id="comment"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Enter your comment..."
                          rows={4}
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setShowCommentDialog(false)}>
                          Cancel
                        </Button>
                        <Button 
                          onClick={handleAddComment}
                          disabled={addCommentMutation.isPending}
                          className="bg-navyblue hover:bg-darkblue text-white dark:bg-golden dark:hover:bg-goldenrod1 dark:text-navyblue"
                        >
                          {addCommentMutation.isPending ? "Adding..." : "Add Comment"}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {contract.pdfUrl ? (
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <iframe
                      src={contract.pdfUrl}
                      className="w-full h-96"
                      title="Contract PDF"
                    />
                  </div>
                ) : contract.pdfContent ? (
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
                    <pre className="whitespace-pre-wrap text-sm text-gray-900 dark:text-white">
                      {contract.pdfContent}
                    </pre>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">No document content available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Comments Panel */}
          <div className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-navyblue dark:text-golden">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Comments ({comments?.length || 0})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                {commentsLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="flex space-x-3">
                          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : comments?.length > 0 ? (
                  comments.map((comment: any) => (
                    <div key={comment.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={comment.user?.profileImageUrl} />
                            <AvatarFallback className="bg-navyblue text-white text-xs">
                              {comment.user?.firstName?.[0]}{comment.user?.lastName?.[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {comment.user?.firstName} {comment.user?.lastName}
                              </span>
                              {comment.lineNumber && (
                                <Badge variant="outline" className="text-xs">
                                  Line {comment.lineNumber}
                                </Badge>
                              )}
                              <span className="text-xs text-gray-500 dark:text-gray-500">
                                {format(new Date(comment.createdAt), "MMM dd, yyyy HH:mm")}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                              {comment.comment}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {!comment.isResolved && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => resolveCommentMutation.mutate(comment.id)}
                              className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                            className="text-navyblue dark:text-golden"
                          >
                            <Reply className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {comment.isResolved && (
                        <div className="mt-2 flex items-center text-xs text-green-600 dark:text-green-400">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Resolved
                        </div>
                      )}

                      {replyingTo === comment.id && (
                        <div className="mt-3 space-y-2">
                          <Textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write a reply..."
                            rows={2}
                            className="text-sm"
                          />
                          <div className="flex justify-end space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => {
                                setReplyingTo(null);
                                setReplyText("");
                              }}
                            >
                              Cancel
                            </Button>
                            <Button 
                              size="sm" 
                              onClick={() => handleReply(comment.id)}
                              disabled={addCommentMutation.isPending}
                              className="bg-navyblue hover:bg-darkblue text-white dark:bg-golden dark:hover:bg-goldenrod1 dark:text-navyblue"
                            >
                              Reply
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <MessageSquare className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">No comments yet</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">Be the first to add a comment</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}