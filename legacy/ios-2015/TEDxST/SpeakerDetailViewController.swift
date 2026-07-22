//
//  SpeakerDetailViewController.swift
//  TEDxST
//
//  Created by Kris Haamer on 04.06.15.
//  Copyright (c) 2015 HAAM. All rights reserved.
//

import UIKit
import Bolts
import Parse
import ParseUI

class SpeakerDetailViewController: UIViewController {
    
    @IBOutlet weak var speakerImageBig: PFImageView!
    @IBOutlet weak var speakerName: UILabel!
    @IBOutlet weak var speakerBio: UILabel!
    @IBOutlet weak var speakerTalkTitle: UILabel!
    @IBOutlet weak var dismissModalBtn: UIBarButtonItem!

    var currentObject: PFObject!
    
    override func viewDidLoad() {

        if let obj = currentObject {

            if let name:String = obj["name"] as? String {
                self.speakerName.text = name
                self.speakerName.alpha = 0
            }
        
            if let bio:String = obj["speaker_bio"] as? String {
                self.speakerBio.text = bio
                self.speakerBio.alpha = 0
            }

            if let talkTitle:String = obj["talk_title"] as? String {
                self.speakerTalkTitle.text = talkTitle
                self.speakerTalkTitle.alpha = 0
            }
            
            if let photo:PFFile = self.currentObject["img"] as? PFFile {

                self.speakerImageBig.file = photo
                self.speakerImageBig.loadInBackground()
                self.speakerImageBig.contentMode = UIViewContentMode.ScaleAspectFill
                self.speakerImageBig.alpha = 0.0
            }
        }
        
        dismissModalBtn.target = self
        dismissModalBtn.action = "handleClose:"
        let panGestureRecognizer = UIPanGestureRecognizer(target: self, action: Selector("handlePan:"))
        self.view.addGestureRecognizer(panGestureRecognizer)
        
        super.viewDidLoad()
    }
    
    
    func handlePan(sender: UIPanGestureRecognizer){
        if(sender.state == UIGestureRecognizerState.Ended){
            self.dismissViewControllerAnimated(true , completion: nil);
        }
    }

    @IBAction func handleClose(b:UIBarButtonItem) {
        self.dismissViewControllerAnimated(true, completion: {})
    }

    override func viewWillAppear(animated: Bool) {
        
        speakerImageBig.fadeIn()
        speakerBio.fadeIn()
        speakerName.fadeIn()
        speakerTalkTitle.fadeIn()
    }
    
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}
