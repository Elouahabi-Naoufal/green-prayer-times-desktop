
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-4 pb-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="pl-0 flex items-center gap-1 text-mosque-700">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-mosque-700 mb-6">Settings</h1>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>About</CardTitle>
              <CardDescription>About this application</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Prayer Times App</h3>
                  <p className="text-gray-600">A beautiful desktop application to display prayer times for Tangier.</p>
                </div>
                <div>
                  <h3 className="font-medium">Data Source</h3>
                  <p className="text-gray-600">Prayer times are fetched from yabiladi.com.</p>
                </div>
                <div>
                  <h3 className="font-medium">Version</h3>
                  <p className="text-gray-600">1.0.0</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Credits</CardTitle>
              <CardDescription>Acknowledgements</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                This application was created as a desktop prayer times viewer. 
                It uses Electron for the desktop functionality and React for the user interface.
              </p>
            </CardContent>
            <CardFooter className="flex justify-end">
              <p className="text-sm text-gray-500">© 2025 Prayer Times App</p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
