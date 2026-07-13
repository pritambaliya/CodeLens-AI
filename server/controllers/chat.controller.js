import Chat from "../model/chat.model.js";
import chatWithAI from "../service/chatbot.service.js";

export const chat = async (req, res) => {
    try {
        const { chatId, message } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: "Message is required",
            });
        }

        let chat;

        if (chatId) {
            chat = await Chat.findById(chatId);

            if (!chat) {
                return res.status(404).json({
                    success: false,
                    message: "Chat not found",
                });
            }
        } else {
            chat = await Chat.create({
                user: req.user._id,
                title: message.substring(0, 30),
                messages: [],
            });
        }

        chat.messages.push({
            role: "user",
            content: message,
        });

        const reply = await chatWithAI(chat.messages);

        chat.messages.push({
            role: "assistant",
            content: reply,
        });

        await chat.save();

        res.status(200).json({
            success: true,
            chatId: chat._id,
            reply,
            messages: chat.messages,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const deleteChat = async (req, res) => {
    try {
        const { chatId } = req.params;

        const chat = await Chat.findOne({
            _id: chatId,
            user: req.user._id,
        });

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: "Chat not found",
            });
        }

        await Chat.findByIdAndDelete(chatId);

        res.status(200).json({
            success: true,
            message: "Chat deleted successfully",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};